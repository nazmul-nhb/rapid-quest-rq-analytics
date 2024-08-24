import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getCLTVReport } from "../utils/getData";
import { Line } from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

const CLTVReport: React.FC = () => {
	const { data: CLTVReport = [], isLoading: isCLTVLoading } = useQuery({
		queryKey: ["CLTVReport"],
		queryFn: getCLTVReport,
	});

	const labels = CLTVReport.map((c) => c.month);
	const cltvValues = CLTVReport.map((c) => c.totalCLTV);
	const customerCounts = CLTVReport.map((c) => c.customerCount);

	const chartData = {
		labels,
		datasets: [
			{
				label: "Total CLTV",
				data: cltvValues,
				borderColor: "rgba(75, 192, 192, 1)",
				backgroundColor: "rgba(75, 192, 192, 0.2)",
				fill: true,
			},
			{
				label: "Customer Count",
				data: customerCounts,
				borderColor: "rgba(153, 102, 255, 1)",
				backgroundColor: "rgba(153, 102, 255, 0.2)",
				fill: true,
			},
		],
	};

	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: "top" as const,
			},
			title: {
				display: true,
				text: "Customer Lifetime Value by Month",
			},
		},
	};

	if (isCLTVLoading)
		return (
			<div className="flex items-center justify-center">Loading...</div>
		);

	return (
		<section className="flex justify-center h-[88vh] w-full">
			<Line data={chartData} options={options} />
		</section>
	);
};

export default CLTVReport;
