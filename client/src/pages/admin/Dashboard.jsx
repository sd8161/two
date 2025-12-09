import React, { useEffect, useState } from "react";
import {
  ChartLineIcon,
  CircleDollarSignIcon,
  PlayCircleIcon,
  User2Icon,
  StarIcon,
} from "lucide-react";

import { dummyDashboardData } from "../../assets/assets";
import Loading from "../../components/Loading";
import Title from "../../components/admin/Title";
import BlurCircle from "../../components/BlurCircle";
import { dateFormat } from "../../lib/dateFormat";
import toast from "react-hot-toast";
import { useAppContext } from "../../context/AppContext";


const Dashboard = () => {

  const {axios, getToken, user, image_base_url} = useAppContext()

  const currency = import.meta.env.VITE_CURRENCY || "$";

  const [dashboardData, setDashboardData] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    activeShows: [],
    totalUser: 0,
  });

  const [loading, setLoading] = useState(true);

  const dashboardCards = [
    {
      title: "Total Bookings",
      value: dashboardData.totalBookings,
      icon: ChartLineIcon,
    },
    {
      title: "Total Revenue",
      value: `${currency}${dashboardData.totalRevenue}`,
      icon: CircleDollarSignIcon,
    },
    {
      title: "Active Shows",
      value: dashboardData.activeShows.length,
      icon: PlayCircleIcon,
    },
    {
      title: "Total Users",
      value: dashboardData.totalUser,
      icon: User2Icon,
    },
  ];

  const fetchDashboardData = async () => {
     try{
      const { data } = await axios.get("/api/admin/dashboard", {headers: { Authorization: `Bearer ${await getToken()}`}})
      if(data.success){
        setDashboardData(data.dashboardData)
        setLoading(false)
      }else{
        toast.error(data.message)
      }
     } catch (error) {
      toast.error("Error fetching:"), error

     }
  };

  useEffect(() => {
    if(user)
    {fetchDashboardData();}
  }, [user]);

  if (loading) return <Loading />;

  return (
    <div className="px-4 md:px-8 lg:px-16 py-8 text-white">
      
      {/* Title */}
      <Title text1="Admin" text2="Dashboard" />

      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {dashboardCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              className="p-6 bg-primary/10 border border-primary/20 rounded-lg flex items-center gap-4"
            >
              <div className="p-3 bg-primary/20 rounded-md">
                <Icon className="w-6 h-6 text-primary" />
              </div>

              <div>
                <p className="text-gray-300 text-sm">{card.title}</p>
                <h2 className="text-xl font-bold mt-1">{card.value}</h2>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Shows */}
      <p className="mt-10 text-lg font-medium">Active Shows</p>

      <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
        <BlurCircle top="100px" left="-10%" />

        {dashboardData.activeShows.map((show) => (
          <div
            key={show._id}
            className="bg-primary/10 border border-primary/20 rounded-lg overflow-hidden 
                       hover:-translate-y-1 transition duration-300"
          >
            {/* Poster */}
            <img
              src={image_base_url + show.movie.poster_path}
              alt=""
              className="h-60 w-full object-cover"
            />

            {/* Title */}
            <p className="font-medium p-2 truncate">
              {show.movie.title}
            </p>

            {/* Price + Rating */}
            <div className="flex items-center justify-between px-2">
              <p className="text-lg font-medium">
                {currency}{show.showPrice}
              </p>

              <p className="flex items-center gap-1 text-sm text-gray-400">
                <StarIcon className="w-4 h-4 text-primary fill-primary" />
                {show.movie.vote_average.toFixed(1)}
              </p>
            </div>

            {/* Date */}
            <p className="px-2 pt-2 pb-3 text-sm text-gray-500">
              {dateFormat(show.showDateTime)}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Dashboard;
