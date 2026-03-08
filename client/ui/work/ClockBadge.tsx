"use client";

import React, { useEffect, useState } from "react";
import { Badge } from "@/src/components/ui/badge";
import dayjs from "dayjs";
import { Clock } from "lucide-react";

const getFormattedTime = () => dayjs().format("DD/MM/YYYY HH:mm");

const ClockBadge = () => {
  const [currentTime, setCurrentTime] = useState(getFormattedTime);

  useEffect(() => {
    const now = new Date();
    const delay = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

    const timeout = setTimeout(() => {
      setCurrentTime(getFormattedTime());

      const interval = setInterval(() => {
        setCurrentTime(getFormattedTime());
      }, 60000);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Badge variant="secondary" className="h-fit">
      <Clock className="w-4 h-4 mr-2" />
      <span className="text-sm font-medium">{currentTime}</span>
    </Badge>
  );
};

export default ClockBadge;
