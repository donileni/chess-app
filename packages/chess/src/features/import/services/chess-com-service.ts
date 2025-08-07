import { type AsyncResultType, ErrorUtil, Result } from "@chess-app/common";
import { ChessGame } from "../../../models/chess-models";
import {
    type ChessComArchive,
    type ChessComGame,
    ChessComGamesSchema,
    type ChessComStats,
    ChessComStatsSchema,
} from "../models/chess-com-models";

const BASE_URL = "https://api.chess.com";
const PLAYER_ENDPOINT = (player: string, subpath: string) =>
    `${BASE_URL}/pub/player/${player.toLowerCase()}/${subpath}`;

const fetchPlayerStats = async (
    player: string
): AsyncResultType<ChessComStats> => {
    let response;
    try {
        response = await fetch(PLAYER_ENDPOINT(player, "stats"), {
            method: "GET",
        });
    } catch (e) {
        const message = ErrorUtil.toErrorMessage(e);
        return Result.error(
            `Could not fetch player stats: ${message}`,
            "INTERNAL_SERVER_ERROR"
        );
    }

    const data = await response.json();
    const stats = ChessComStatsSchema.safeParse(data);
    if (!stats.success) {
        return Result.error(
            `Invalid data format: ${stats.error.message}`,
            "BAD_REQUEST"
        );
    }
    return Result.ok(stats.data);
};

const fetchGameArchives = async (player: string) => {
    const url = PLAYER_ENDPOINT(player, "games/archives");
    const response = await fetch(url, { method: "GET" });
    return (await response.json()) as ChessComArchive;
};

export const fetchAllGames = async (player: string, timestamp?: number) => {
    const timestampDate = new Date(timestamp ?? 0);
    const approximateDate = new Date(
        timestampDate.getFullYear(),
        timestampDate.getMonth(),
        1
    );
    const archives = await fetchGameArchives(player);
    const filteredArchives = archives.archives.filter((archive) => {
        const [year, month] = archive.split("/").slice(-2);
        if (!year || !month) {
            return false;
        }
        const archiveDate = new Date(
            Number.parseInt(year),
            Number.parseInt(month) - 1
        );
        return archiveDate >= approximateDate;
    });

    const allGames: ChessComGame[] = [];
    for (const archive of filteredArchives) {
        const response = await fetch(archive, {
            method: "GET",
        });
        const games = ChessComGamesSchema.safeParse(await response.json());

        if (!games.success) {
            console.error("Could not parse games:", games.error);
            return;
        }

        for (const game of games.data.games) {
            allGames.push(game);
        }
    }

    return allGames.map(ChessGame.fromChessCom);
};

export const ChessComService = {
    fetchPlayerStats,
    fetchGameArchives,
    fetchAllGames,
};
