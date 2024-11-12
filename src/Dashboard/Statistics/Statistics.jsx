import { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import useAxiosSecure from "../../Hooks/useAxiosSecure/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const Statistics = () => {
  const axiosSecure = useAxiosSecure();

  const { data: bookingByDate = [] } = useQuery({
    queryKey: ["BookingDate"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/allStatisticsDate`, {
        withCredentials: true,
      });
      return res.data;
    },
  });

  const [barChartData, setBarChartData] = useState({
    series: [
      {
        name: "Bookings",
        data: [],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 430,
      },
      plotOptions: {
        bar: {
          horizontal: true,
          dataLabels: {
            position: "top",
          },
        },
      },
      dataLabels: {
        enabled: true,
        offsetX: -6,
        style: {
          fontSize: "12px",
          colors: ["#fff"],
        },
      },
      stroke: {
        show: true,
        width: 1,
        colors: ["#fff"],
      },
      tooltip: {
        shared: true,
        intersect: false,
      },
      xaxis: {
        categories: [],
      },
    },
  });

  const [lineChartData, setLineChartData] = useState({
    series: [
      {
        name: "Booked Parcels",
        data: [],
      },
      {
        name: "Delivered Parcels",
        data: [],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },
      title: {
        text: "Comparison of Booked and Delivered Parcels",
        align: "left",
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: [],
      },
    },
  });

  useEffect(() => {
    if (bookingByDate.length > 0) {
      // Process the bookingByDate data
      const dateCounts = {};
      const bookedCounts = {};
      const deliveredCounts = {};

      bookingByDate.forEach((entry) => {
        const date = entry.BookingDate;
        if (!dateCounts[date]) {
          dateCounts[date] = 0;
        }
        dateCounts[date] += 1;

        if (!bookedCounts[date]) {
          bookedCounts[date] = 0;
        }
        if (!deliveredCounts[date]) {
          deliveredCounts[date] = 0;
        }

        bookedCounts[date] += 1;
        if (entry.status === "Delivered") {
          deliveredCounts[date] += 1;
        }
      });

      const dates = Object.keys(dateCounts);
      const bookingData = Object.values(dateCounts);
      const bookedData = Object.values(bookedCounts);
      const deliveredData = Object.values(deliveredCounts);

      // Update bar chart data
      setBarChartData((prevData) => ({
        ...prevData,
        series: [
          {
            name: "Bookings",
            data: bookingData,
          },
        ],
        options: {
          ...prevData.options,
          xaxis: {
            ...prevData.options.xaxis,
            categories: dates,
          },
        },
      }));

      // Update line chart data
      setLineChartData((prevData) => ({
        ...prevData,
        series: [
          {
            name: "Booked Parcels",
            data: bookedData,
          },
          {
            name: "Delivered Parcels",
            data: deliveredData,
          },
        ],
        options: {
          ...prevData.options,
          xaxis: {
            ...prevData.options.xaxis,
            categories: dates,
          },
        },
      }));
    }
  }, [bookingByDate]);

  return (
    <div className="mt-6">
      <div className="space-y-4">
        <div className="bg-white">
          <div className="p-6">
            <ReactApexChart
              options={barChartData.options}
              series={barChartData.series}
              type="bar"
              height={400}
            />
          </div>
        </div>
        <div className="bg-white">
          <div className="p-6">
            <ReactApexChart
              options={lineChartData.options}
              series={lineChartData.series}
              type="line"
              height={320}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
