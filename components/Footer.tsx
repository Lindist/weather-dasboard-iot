"use client";
import { useEffect, useState } from "react";
import { Icons } from "./icons";

import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
  Parallax,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { loginTb,readSetting } from "@/app/actions";
import GaugeComponent from "react-gauge-component";
import { clampNumber, formatGaugeValue, getGaugeTicks } from "@/types/gauge";

export function Footer() {
  const [tempIn, setTempIn] = useState(0);
  const [tempOut, setTempOut] = useState(0);
  const [humIn, setHumIn] = useState(0);
  const [humOut, setHumOut] = useState(0);
  const [pressure, setPressure] = useState(0);
  const [rainfall, setRainfall] = useState(0);
  const [windDirection,setWindDirection] = useState("NA");
  const [windSpeed, setWindSpeed] = useState(0);
  const [windAvg, setWindAvg] = useState(0);

  useEffect(() => {
    let cancelled = false;
    let webSocket: WebSocket | null = null;

    const fetchLoginData = async () => {
      try {
        const login = await loginTb();
        const setting = await readSetting();
        // console.log(setting)

        if (setting.success && setting.data && setting.data.setting && setting.data.setting.entityType && setting.data.setting.entityId) {
          if (!login.success) {
            console.error(login.error);
            return;
          }
          const token = login.data.token;
          const { entityType, entityId } = setting.data.setting;
          if (cancelled) return;

          const ws = new WebSocket(process.env.NEXT_PUBLIC_TB_WS_URL || "");
          webSocket = ws;

          ws.onopen = () => {
            if (cancelled) return;
            const object = {
              authCmd: {
                cmdId: 0,
                token: token,
              },
              cmds: [
                {
                  entityType: entityType,
                  entityId: entityId,
                  scope: "LATEST_TELEMETRY",
                  cmdId: 10,
                  type: "TIMESERIES",
                },
              ],
            };
            const data = JSON.stringify(object);
            ws.send(data);
          };

          ws.onmessage = (event) => {
            if (cancelled) return;
            const receivedData = JSON.parse(event.data);
            const { data } = receivedData;
            const {
              tempIn,
              tempOut,
              humIn,
              humOut,
              pressure,
              rainfall,
              windDirection,
              windSpeed,
              windAvg,
            } = data;
            setTempIn(Number(tempIn?.[0]?.[1]));
            setTempOut(Number(tempOut?.[0]?.[1]));
            setHumIn(Number(humIn?.[0]?.[1]));
            setHumOut(Number(humOut?.[0]?.[1]));
            setPressure(Number(pressure?.[0]?.[1]));
            setRainfall(Number(rainfall?.[0]?.[1]));
            setWindDirection(windDirection[0][1]);
            setWindSpeed(Number(windSpeed?.[0]?.[1]));
            setWindAvg(Number(windAvg?.[0]?.[1]));
          };

          ws.onclose = () => {
            console.log("Connection closed!");
          };
        } else {
          console.error("Setting data is null or empty");
        }
      } catch (error) {
        console.log(error)
      }
    };
    fetchLoginData();

    return () => {
      cancelled = true;
      webSocket?.close();
    };
  }, []);

  const renderGauge = (spec: { value: number; min: number; max: number; unit: string }) => {
    const ticks = getGaugeTicks(spec.min, spec.max);
    const safeValue = clampNumber(spec.value, spec.min, spec.max);

    return (
      <GaugeComponent
        type="semicircle"
        minValue={spec.min}
        maxValue={spec.max}
        value={safeValue}
        arc={{
          width: 0.18,
          padding: 0.02,
          cornerRadius: 8,
          // 3 zones similar to the previous ECharts color stops
          subArcs: [
            { limit: spec.min + (spec.max - spec.min) * 0.3, color: "#67e0e3" },
            { limit: spec.min + (spec.max - spec.min) * 0.7, color: "#37a2da" },
            { limit: spec.max, color: "#fd666d" },
          ],
        }}
        pointer={{
          type: "arrow",
          width: 8,
          length: 0.38,
          color: "#B12C00",
          elastic: true,
        }}
        labels={{
          valueLabel: {
            formatTextValue: () => formatGaugeValue(safeValue, spec.unit),
            style: { fill: "rgba(255,255,255,0.95)", fontSize: "14px" },
          },
          tickLabels: {
            type: "inner",
            ticks: ticks.map((v) => ({ value: v })),
            defaultTickValueConfig: {
              style: { fill: "rgba(255,255,255,0.7)", fontSize: "10px" },
            },
          },
        }}
        style={{ width: "100%", height: "100%" }}
      />
    );
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-between mx-4">
        <div className="flex flex-col">
          <div className="flex gap-3">
            <h3 className="text-2xl">Wind</h3>
            <Icons.wind className="h-8 w-8 rounded-full bg-[#0e1426] p-1" />
          </div>
          <div className="flex gap-2">
            <p className="text-xl text-[#5f6281]">Direction:</p>
            <p className="text-xl text-white">{windDirection}</p>
          </div>
          <div className="flex gap-2">
            <p className="text-xl text-[#5f6281]">Speed:</p>
            <p className="text-xl text-white">{windSpeed} m/s</p>
          </div>
          <div className="flex gap-2">
            <p className="text-xl text-[#5f6281]">Average:</p>
            <p className="text-xl text-white">{windAvg}</p>
          </div>
        </div>
      </div>
      <div className="flex m-4 gap-3 min-h-60">
        <Swiper
          modules={[
            Navigation,
            Pagination,
            Scrollbar,
            A11y,
            Autoplay,
            Parallax,
          ]}
          spaceBetween={10}
          slidesPerView={4}
          navigation
          pagination={{ clickable: true }}
          autoplay
          breakpoints={{
            200: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
          }}
        >
          <SwiperSlide>
            <div className="flex flex-col rounded-xl bg-linear-to-b from-[#0e1426] to-[#18264d] p-3 h-full">
              <div className="flex items-center justify-between gap-3">
                <span className="text-base text-white">Temperature IN</span>
                <Icons.temperature className="h-5 w-5" />
              </div>
              <div className="mt-1 h-[140px] w-full">
                {renderGauge({ value: tempIn, min: -40, max: 80, unit: "°C" })}
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex flex-col rounded-xl bg-linear-to-b from-[#0e1426] to-[#18264d] p-3 h-full">
              <div className="flex items-center justify-between gap-3">
                <span className="text-base text-white">Humidity IN</span>
                <Icons.droplet className="h-5 w-5" />
              </div>
              <div className="mt-1 h-[140px] w-full">
                {renderGauge({ value: humIn, min: 0, max: 100, unit: "%" })}
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex flex-col rounded-xl bg-linear-to-b from-[#0e1426] to-[#18264d] p-3 h-full">
              <div className="flex items-center justify-between gap-3">
                <span className="text-base text-white">Pressure</span>
                <Icons.gauge className="h-5 w-5" />
              </div>
              <div className="mt-1 h-[140px] w-full">
                {renderGauge({ value: pressure, min: 900, max: 1100, unit: "hPa" })}
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex flex-col rounded-xl bg-linear-to-b from-[#0e1426] to-[#18264d] p-3 h-full">
              <div className="flex items-center justify-between gap-3">
                <span className="text-base text-white">Rainfall</span>
                <Icons.cloudRain className="h-5 w-5" />
              </div>
              <div className="mt-1 h-[140px] w-full">
                {renderGauge({ value: rainfall, min: 0, max: 100, unit: "mm" })}
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex flex-col rounded-xl bg-linear-to-b from-[#0e1426] to-[#18264d] p-3 h-full">
              <div className="flex items-center justify-between gap-3">
                <span className="text-base text-white">Temperature OUT</span>
                <Icons.temperature className="h-5 w-5" />
              </div>
              <div className="mt-1 h-[140px] w-full">
                {renderGauge({ value: tempOut, min: -40, max: 80, unit: "°C" })}
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex flex-col rounded-xl bg-linear-to-b from-[#0e1426] to-[#18264d] p-3 h-full">
              <div className="flex items-center justify-between gap-3">
                <span className="text-base text-white">Humidity OUT</span>
                <Icons.droplet className="h-5 w-5" />
              </div>
              <div className="mt-1 h-[140px] w-full">
                {renderGauge({ value: humOut, min: 0, max: 100, unit: "%" })}
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}