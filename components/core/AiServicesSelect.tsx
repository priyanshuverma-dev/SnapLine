"use client";

import React, { useState } from "react";

import { SelectItem } from "../ui/select";

type ListProp = {
  id: string;
  name: string;
};

const fetchAIList = async () => {
  const res = await fetch("/api/ai/service/list");
  const data: ListProp[] = await res.json();
  if (!data) {
    console.log("No data found");
    return [];
  }

  if (res.status === 200) {
    return data;
  } else {
    console.log("Error fetching data");
    return [];
  }
};

const AiServicesSelect = () => {
  const [services, setServices] = useState<string[]>([]);
  if (services.length === 0) {
    fetchAIList().then((data) => setServices(data.map((d) => d.name)));
  }

  return (
    <>
      {services.map((service) => (
        <SelectItem key={service} value={service}>
          {service}
        </SelectItem>
      ))}
    </>
  );
};

export default AiServicesSelect;
