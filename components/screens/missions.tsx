"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress as ProgressBar } from "@/components/ui/progress" // Standardized Progress alias
import { Target, Clock, Star, Trophy, Zap, Gift, DollarSign, BookOpen } from "lucide-react"
import { useState, useEffect } from "react" 

interface MissionsProps {
	user: any
}

// --- FIX: Mocking useTranslation hook to resolve compilation error ---
const useTranslation = () => {
    // Basic mock implementation for t(key, fallback)
    const t = (key: string, fallback?: string) => fallback || key.split(/(?=[A-Z])/).join(" ");
    return { t };
};
// -------------------------------------------------------------------

const specialEvents = [
	{
		id: "diwali-special",
		title: "Diwali Festival Challenge",
		description: "Complete special Diwali-themed lessons",
		progress: 0,
		total: 5,
		reward: "Festival Crown",
		type: "crown",
		difficulty: "Special",
		timeLeft: "2 days left",
	},
]

// --- MAIN COMPONENT ---
export function Missions({ user }: MissionsProps) {
	const { t } = useTranslation()

	// State for mission progress fetched from API (simulated)
	const [dailyMission, setDailyMission] = useState({ dailyMath: 0, dailyReading: 0, dailyStreass: 1 });
	// State for general daily stats (solved questions, streak)
	const [dailyStat, setDailyStat] = useState({ solved: 0, streak: 1, starsEarned: 0, totalCoins: user?.coins || 850 });

	// --- FUNCTIONALITY: API Simulation ---
	useEffect(() => {
		// Mocking API call 1: Fetch Mission Progress
		fetch('https://tatvab.onrender.com/progress', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ phone_no: user?.phone_no || user?.phoneNumber }),
		})
			.then((response) => response.json())
			.then((data) => {
				// Assuming M_Q is Math Questions solved
				setDailyMission(prev => ({ ...prev, dailyMath: data.M_Q || 0 }));
			})
			.catch((error) => { console.error('Error fetching mission progress:', error); });

		// Mocking API call 2: Fetch Daily Stats
		fetch('https://tatvab.onrender.com/daily_info', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ phone_no: user?.phone_no || user?.phoneNumber }),
		})
			.then((response) => response.json())
			.then((data) => {
				// Assuming data structure contains solved, streak, and totalCoins
				setDailyStat(data);
			})
			.catch((error) => { console.error('Error fetching daily info:', error); });
	}, [user?.phone_no, user?.phoneNumber]);


	// --- DATA STRUCTURES (Using real-time state) ---

	const dailyMissions = [
		{
			id: "daily-math",
			title: "Math Master",
			description: "Complete 3 math problems",
			progress: Math.min(dailyMission.dailyMath || 0, 3), // Safe calculation
			total: 3,
			reward: 50,
			type: "coins",
			difficulty: "Easy",
		},
		{
			id: "daily-reading",
			title: "Reading Rocket",
			description: "Read for 15 minutes",
			progress: Math.min(dailyMission.dailyReading || 0, 15),
			total: 15,
			reward: 30,
			type: "coins",
			difficulty: "Medium",
		},
		{
			id: "daily-streak",
			title: "Learning Streak",
			description: "Login for 3 consecutive days",
			progress: Math.min(dailyStat.streak || 0, 3),
			total: 3,
			reward: 100,
			type: "coins",
			difficulty: "Easy",
		},
	]

	const weeklyMissions = [
		{
			id: "weekly-explorer",
			title: "Planet Explorer",
			description: "Complete 5 chapters across any subjects",
			progress: Math.min(dailyStat.solved || 0, 5), // Use solved stat
			total: 5,
			reward: "Space Explorer Badge",
			type: "badge",
			difficulty: "Hard",
		},
		{
			id: "weekly-star",
			title: "Star Collector",
			description: "Earn 50 stars this week",
			progress: Math.min(dailyStat.starsEarned || 0, 50), // Assuming API provides starsEarned
			total: 50,
			reward: 200,
			type: "coins",
			difficulty: "Medium",
		},
	]
	
	// --- HANDLERS ---
	
	// Handler for all mission 'Continue' buttons
	const handleMissionAction = (mission: any) => {
		const missionTitleLower = mission.title.toLowerCase();
		
		let actionMessage = `ACTION: Starting mission: ${mission.title} (${mission.id}).`;

		if (missionTitleLower.includes('math')) {
			actionMessage = `ACTION: Routing to Math Practice page for question prompt.`;
			// In a real app: router.push('/app/practice/math');
		} else if (missionTitleLower.includes('reading')) {
			actionMessage = `ACTION: Launching Reading Timer/Lesson.`;
			// In a real app: router.push('/app/lesson/reading');
		} else if (mission.type === 'badge' || mission.type === 'crown') {
			actionMessage = `ACTION: Directing to dedicated Challenge Hub.`;
		}
		
		// Simulate the action completion logic for demonstration
		console.log(actionMessage);
		
		if (mission.title === "Math Master" && mission.progress < mission.total) {
            // Simulate immediately bumping progress for the demo
            setDailyMission(prev => ({ ...prev, dailyMath: (prev.dailyMath || 0) + 1 }));
            console.log("SIMULATION: Math mission progress increased!");
        }
	}


	// --- HELPERS ---

	const getDifficultyColor = (difficulty: string) => {
		switch (difficulty) {
			case "Easy":
				return "bg-green-500/10 text-green-600 border-green-500/20"
			case "Medium":
				return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
			case "Hard":
				return "bg-red-500/10 text-red-600 border-red-500/20"
			case "Special":
				// Special events get a unique, more exciting look
				return "bg-purple-500/10 text-purple-600 border-purple-500/20 shadow-lg shadow-purple-500/10"
			default:
				return "bg-muted/10 text-muted-foreground border-muted/20"
		}
	}

	// Helper function to get the appropriate icon for the reward type
	const getRewardIcon = (type: string) => {
		switch (type) {
			case "coins":
				return <DollarSign className="w-4 h-4 text-yellow-500 fill-yellow-500/20" />
			case "badge":
				return <Trophy className="w-4 h-4 text-purple-500" />
			case "crown":
				return <Star className="w-4 h-4 text-yellow-500 fill-yellow-500/50" />
			default:
				return <Gift className="w-4 h-4 text-primary" />
		}
	}

	// --- SUB-COMPONENT: Mission Card ---
	const MissionCard = ({ mission, isSpecial = false }: { mission: any; isSpecial?: boolean }) => {
		const progressValue = (mission.progress / mission.total) * 100;
		const isCompleted = mission.progress >= mission.total;

		return (
			<Card 
				className={`border-2 transition-transform duration-200 ${isCompleted ? 'opacity-70' : 'hover:scale-[1.01] hover:shadow-lg'} ${isSpecial 
					? "border-purple-500/40 bg-purple-500/10 shadow-xl shadow-purple-500/10" 
					: "border-primary/20 bg-card/90"
				}`}
			>
				<CardContent className="p-4 space-y-3">
					<div className="flex items-start justify-between">
						<div className="flex-1">
							<div className="flex items-center gap-2 mb-1">
								<h4 className="font-semibold text-foreground">
									{t(mission.title.replace(/\s/g, ''), mission.title)}
								</h4>
								<Badge className={getDifficultyColor(mission.difficulty)}>{mission.difficulty}</Badge>
							</div>
							<p className="text-sm text-muted-foreground">
								{t(mission.description.replace(/\s/g, ''), mission.description)}
							</p>
							{mission.timeLeft && (
								<p className="text-xs text-purple-600 font-medium mt-2 flex items-center gap-1">
									<Clock className="w-3 h-3 text-purple-500" />
									{mission.timeLeft}
								</p>
							)}
						</div>
						{/* Mission Type Icon */}
						{isCompleted ? (
							<Trophy className="w-6 h-6 text-yellow-500 animate-bounce-slow" />
						) : (
							<Target className="w-6 h-6 text-primary/70" />
						)}
					</div>

					<div className="space-y-2">
						<div className="flex justify-between text-sm">
							<span>{t("progress", "Progress")}</span>
							<span className="font-medium">
								{mission.progress}/{mission.total}
							</span>
						</div>
						<ProgressBar // Using aliased name
							value={progressValue} 
							className={`h-2 bg-muted-foreground/20 ${isSpecial ? "bg-purple-500" : "bg-primary"}`}
						/>
					</div>

					<div className="flex items-center justify-between pt-1">
						<div className="flex items-center gap-2 text-sm font-medium">
							{getRewardIcon(mission.type)}
							<span className="text-foreground">
								{typeof mission.reward === "number" 
									? `${mission.reward} ${t("coins", "coins")}` 
									: t(mission.reward.replace(/\s/g, ''), mission.reward)}
							</span>
						</div>

						<Button
							size="sm"
							// PASSING THE ENTIRE MISSION OBJECT
							onClick={() => handleMissionAction(mission)}
							disabled={isCompleted}
							className={`font-semibold shadow-md ${isCompleted 
								? "bg-gray-400 text-white" 
								: "bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white"
							}`}
						>
							{isCompleted ? t("completed", "Completed") : t("continue", "Continue")}
						</Button>
					</div>
				</CardContent>
			</Card>
		)
	}

	// --- MAIN RENDER ---
	return (
		<div className="p-4 md:p-6 max-w-4xl mx-auto space-y-8">
			
			{/* HEADER */}
			<div className="text-center space-y-2">
				<h1 className="text-3xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
					{t("missionControl", "Mission Control")} 🎯
				</h1>
				<p className="text-lg text-muted-foreground">{t("missionsSubTitle", "Complete objectives to earn stellar rewards.")}</p>
			</div>

			{/* 1. Special Events */}
			{specialEvents.length > 0 && (
				<div className="space-y-4">
					<CardHeader className="p-0 border-b pb-2 border-purple-500/50">
						<div className="flex items-center gap-3">
							<Zap className="w-6 h-6 text-purple-500 animate-pulse" />
							<h2 className="text-xl font-bold text-purple-500 uppercase">{t("specialEvents", "Special Events")}</h2>
						</div>
					</CardHeader>
					<div className="grid grid-cols-1 gap-4">
						{specialEvents.map((mission) => (
							<MissionCard key={mission.id} mission={mission} isSpecial />
						))}
					</div>
				</div>
			)}

			{/* 2. Daily Missions */}
			<div className="space-y-4">
				<CardHeader className="p-0 border-b pb-2 border-primary/20">
					<div className="flex items-center gap-3">
						<Target className="w-6 h-6 text-primary" />
						<h2 className="text-xl font-bold text-foreground">{t("dailyMissions", "Daily Missions")}</h2>
					</div>
				</CardHeader>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{dailyMissions.map((mission) => (
						<MissionCard key={mission.id} mission={mission} />
					))}
				</div>
			</div>

			{/* 3. Weekly Challenges */}
			<div className="space-y-4">
				<CardHeader className="p-0 border-b pb-2 border-accent/20">
					<div className="flex items-center gap-3">
						<Trophy className="w-6 h-6 text-accent" />
						<h2 className="text-xl font-bold text-foreground">{t("weeklyChallenges", "Weekly Challenges")}</h2>
					</div>
				</CardHeader>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{weeklyMissions.map((mission) => (
						<MissionCard key={mission.id} mission={mission} />
					))}
				</div>
			</div>

			{/* MISSION STATS CARD (Using dynamic state) */}
			<Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-lg">
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<BookOpen className="w-5 h-5 text-secondary" />
						{t("missionStats", "Mission Stats")}
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-3 gap-4 text-center">
						<div className="p-2 border-r border-primary/10">
							<p className="text-3xl font-extrabold text-primary">{dailyStat.solved || 0}</p>
							<p className="text-xs text-muted-foreground">{t("solvedToday", "Solved Today")}</p>
						</div>
						<div className="p-2 border-r border-primary/10">
							<p className="text-3xl font-extrabold text-accent">{dailyStat.streak || 1}</p>
							<p className="text-xs text-muted-foreground">{t("dayStreak", "Day Streak")}</p>
						</div>
						<div className="p-2">
							<p className="text-3xl font-extrabold text-yellow-500">{dailyStat.totalCoins || user?.coins || 850}</p>
							<p className="text-xs text-muted-foreground">{t("totalCoins", "Total Coins")}</p>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
