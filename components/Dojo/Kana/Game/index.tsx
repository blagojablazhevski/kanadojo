"use client";
import clsx from "clsx";
import {useEffect, useMemo} from "react";
import Return from "@/components/reusable/Game/ReturnFromGame";
import Pick from "./Pick";
import Input from "./Input";
import useKanaKanjiStore from "@/store/useKanaKanjiStore";
import useStatsStore from "@/store/useStatsStore";
import Stats from "@/components/reusable/Game/Stats";

const Game = () => {
	const showStats = useStatsStore((state) => state.showStats);

	const resetStats = useStatsStore((state) => state.resetStats);

	const gameMode = useKanaKanjiStore((state) => state.selectedGameModeKana);

	useEffect(() => {
		resetStats();
	}, []);

	const renderPick = useMemo(() => {
		const mode = gameMode.toLowerCase();

		const isReverse = mode.includes("reverse");
		const isPick = mode.includes("pick");
		const Component = isPick ? Pick : Input;

		return (
			<Component
				isReverse={isReverse}
				isHidden={showStats}
			/>
		);
	}, [gameMode, showStats]);

	return (
		<div
			className={clsx(
				"flex flex-col gap-6 md:gap-10 items-center min-h-[100dvh] max-w-[100dvw] px-4"
				// "bg-[url('/wallpapers/neonretrocarcity.jpg')] bg-cover bg-center"
				// "bg-[url('/wallpapers/kanaDojoWallpaper.png')] bg-cover bg-center backdrop-blur-lg"
			)}>
			{showStats && <Stats />}
			<Return
				isHidden={showStats}
				href="/kana"
			/>
			{renderPick}
		</div>
	);
};

export default Game;
