import {
    type AsyncResultType,
    createLogger,
    ErrorUtil,
    Result,
    ValidationUtil,
} from "@chess-app/common";
import { ChessGame } from "../../../models/chess-models";
import {
    type ChessComArchive,
    type ChessComGame,
    ChessComGamesSchema,
    type ChessComStats,
    ChessComStatsSchema,
} from "../models/chess-com-models";

const logger = createLogger("chess-com-service");

const BASE_URL = "https://api.chess.com";
const PLAYER_ENDPOINT = (player: string, subpath: string) =>
    `${BASE_URL}/pub/player/${player.toLowerCase()}/${subpath}`;

const fetchPlayerStats = async (
    player: string
): AsyncResultType<ChessComStats> => {
    logger.debug({ player }, "Fetching player stats from Chess.com");

    let response;
    try {
        response = await fetch(PLAYER_ENDPOINT(player, "stats"), {
            method: "GET",
        });
    } catch (error) {
        const message = ErrorUtil.toErrorMessage(error);
        logger.error({ player, error }, "Failed to fetch player stats");
        return Result.error(
            `Could not fetch player stats: ${message}`,
            "INTERNAL_SERVER_ERROR"
        );
    }

    const data = await response.json();
    const stats = ChessComStatsSchema.safeParse(data);
    if (!stats.success) {
        const message = ValidationUtil.errorToString(stats.error);
        logger.error({ player, message }, "Failed to parse player stats");
        return Result.error(`Invalid data format: ${message}`, "BAD_REQUEST");
    }
    return Result.ok(stats.data);
};

const fetchGameArchives = async (player: string) => {
    logger.debug({ player }, "Fetching game archives from Chess.com");
    const url = PLAYER_ENDPOINT(player, "games/archives");
    const response = await fetch(url, { method: "GET" });
    return (await response.json()) as ChessComArchive;
};

export const fetchAllGames = async (player: string, timestamp?: number) => {
    logger.debug(
        { player, timestamp },
        "Fetching all games from Chess.com archives"
    );
    const timestampDate = new Date(timestamp ?? 0);
    const approximateDate = new Date(
        timestampDate.getFullYear(),
        timestampDate.getMonth(),
        1
    );
    logger.debug(
        { player, approximateDate },
        "Using approximate date for filtering archives"
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

    logger.debug(
        { count: filteredArchives.length },
        `Found ${filteredArchives.length} archives after filtering`
    );

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

        logger.debug(
            { count: games.data.games.length },
            `Fetched ${games.data.games.length} games from archive ${archive}`
        );

        for (const game of games.data.games) {
            allGames.push(game);
        }
    }

    logger.debug(
        { count: allGames.length },
        `Total games fetched: ${allGames.length}`
    );

    return allGames.map(ChessGame.fromChessCom);
};

export const ChessComService = {
    fetchPlayerStats,
    fetchGameArchives,
    fetchAllGames,
};
