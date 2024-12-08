import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import React from "react";

interface Content {
  key: string;
  value: string;
}

interface SubCardProps {
  title: string;
  content: Content[];
}

const SubCard = ({ title, content }: SubCardProps) => {
  return (
    <Card className="flex-1">
      <CardHeader className="flex flex-row items-center">
        <div className="flex-1 flex gap-4">
          <CardTitle>{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col w-full">
        {content.map((item, key) => (
          <div key={key} className="flex w-full ">
            {item.key}: {item.value}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default SubCard;
