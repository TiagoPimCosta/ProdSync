"use client";

import React, { useEffect, useState } from "react";
import { Badge } from "@/src/components/ui/badge";
import dayjs from "dayjs";
import { Clock } from "lucide-react";

const ClockBadge = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Badge variant="secondary" className="h-fit">
      <Clock className="w-4 h-4 mr-2" />
      <span className="text-sm font-medium">
        {dayjs(currentTime).format("DD/MM/YYYY HH:mm:ss")}
      </span>
    </Badge>
  );
};

export default ClockBadge;
