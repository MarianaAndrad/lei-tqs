import React, {useEffect, useState} from "react";
import Image from "next/image";

interface Coord {
    lat: number;
    lon: number;
}

interface AirQualityData {
    latitude: number;
    longitude: number;
    aqi: number;
    no2: number;
    co: number;
    no: number;
    nh3: number;
    o3: number;
    so2: number;
    pm2_5: number;
    pm10: number;
    date: number;
}

export default function OpenWeather({ backend }: { backend: string}) {

    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");

    const [apiError, setApiError] = useState(false);
    const [coord, setcoord] = useState<Coord | null>(null);
    const [airQualityData, setAirQualityData] = useState<AirQualityData | null>(null);

    const [searchedCity, setSearchedCity] = useState<string>("");
    const [searchedCountry, setSearchedCountry] = useState<string>("");

    const handleSearch = () => {
        fetch(backend + `/api/v1/${country}/${city}/geocoding`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setcoord(data);
            })
            .catch((err) => setApiError(true));
    };

    const Other = (data: Coord) => {
        if (data && data["lat"] && data["lon"]) {
            const lat = data["lat"];
            const lon = data["lon"];
            fetch(backend + `/api/v1/${lat}/${lon}/air-quality`)
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    setAirQualityData(data);
                })
                .catch((err) => setApiError(true));
        }
    };

    const handleSearchButtonClick = () => {
        setSearchedCity(city);
        setSearchedCountry(country);
        handleSearch();
    }

    useEffect(() => {
        if (coord) {
            Other(coord);
        }
    }, [coord]);

    return (
        <>
            <div className="container  h-screen py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8">
                    <input name="city" type="text" placeholder="City" className="input input-bordered input-secondary w-full" value={city} onChange={(e) => setCity(e.target.value)}/>
                    <input name="country" type="text" placeholder="Country" className="input input-bordered input-secondary w-full " value={country} onChange={(e) => setCountry(e.target.value)}/>
                    <button className="btn btn-primary max-w-xs" onClick={handleSearchButtonClick}>Search</button>
                </div>
                {apiError &&
                    <div className="alert alert-error shadow-lg mt-10">
                        <div>
                            <svg onClick={e => setApiError(false)} xmlns="http://www.w3.org/2000/svg" className="cursor-pointer stroke-current flex-shrink-0 h-6 w-6"
                                 fill="none" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                            <span>Internal Server Error</span>
                        </div>
                    </div>
                }

                { airQualityData && airQualityData["latitude"]  && (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8">
                            <div className="stats shadow">
                                <div className="stat-figure text-secondary">
                                    <label className="swap swap-active text-6xl">
                                        <div className="swap-on">📌️</div>
                                    </label>
                                </div>
                                <div className="stat">
                                    <div className="stat-title">Coordenates Information</div>
                                    <div className="stat-value">({airQualityData["latitude"].toFixed(2)}, {airQualityData["longitude"].toFixed(2)}) </div>
                                </div>
                            </div>
                            <div className="stats shadow">
                                <div className="stat-figure text-secondary">
                                    <label className="swap swap-active text-6xl">
                                        <div className="swap-on">🌐</div>
                                    </label>
                                </div>
                                <div className="stat">
                                    <div className="stat-title">Location Information</div>
                                    <div className="stat-value">{searchedCity}</div>
                                    <div className="stat-desc">In {searchedCountry} </div>
                                </div>
                            </div>
                            <div className="stats shadow">
                                <div className="stat-figure">
                                    <label className="swap swap-active text-6xl">
                                        <div className="swap-on"> ♻ </div>
                                    </label>
                                </div>
                                <div className="stat">
                                    <div className="stat-title">Air Quality Index (AQI)</div>
                                    <div className="stat-value">{airQualityData["aqi"]}</div>
                                    <div className="stat-desc">{airQualityData["date"]}</div>
                                </div>
                            </div>
                        </div>
                        <h1 className="text-2xl font-bold text-center mb-8">Pollutant Concentrations</h1>
                        <div className="grid grid-cols-1 md:grid-cols-1 gap-8 ">

                            <div className="stats shadow">
                                <div className="stat">
                                    <div className="stat-figure text-secondary">
                                        <label className="swap swap-active text-6xl">
                                            <div className="swap-on">CO</div>
                                        </label>
                                    </div>
                                    <div className="stat-title">Carbon Monoxide</div>
                                    <div className="stat-value text-accent">{airQualityData["co"]}</div>
                                </div>

                                <div className="stat">
                                    <div className="stat-figure text-secondary">
                                        <label className="swap swap-active text-6xl">
                                            <div className="swap-on text-primary">NO</div>
                                        </label>
                                    </div>
                                    <div className="stat-title">Nitrogen Oxide</div>
                                    <div className="stat-value">{airQualityData["no"]}</div>

                                </div>

                                <div className="stat">
                                    <div className="stat-figure text-secondary">
                                        <label className="swap swap-active text-6xl">
                                            <div className="swap-on text-accent">NH3</div>
                                        </label>
                                    </div>
                                    <div className="stat-title">Ammonia</div>
                                    <div className="stat-value text-primary">{airQualityData["nh3"]}</div>
                                </div>

                                <div className="stat">
                                    <div className="stat-figure text-secondary">
                                        <label className="swap swap-active text-6xl">
                                            <div className="swap-on">NO2</div>
                                        </label>
                                    </div>
                                    <div className="stat-title">Nitrogen Dioxide</div>
                                    <div className="stat-value">{airQualityData["no2"]}</div>
                                </div>

                            </div>
                            <div className="stats shadow">
                                <div className="stat">
                                    <div className="stat-figure text-secondary">
                                        <label className="swap swap-active text-6xl">
                                            <div className="swap-on">O3</div>
                                        </label>
                                    </div>
                                    <div className="stat-title">Ozone</div>
                                    <div className="stat-value">{airQualityData["o3"]}</div>
                                </div>

                                <div className="stat">
                                    <div className="stat-figure text-secondary">
                                        <label className="swap swap-active text-6xl">
                                            <div className="swap-on">SO2</div>
                                        </label>
                                    </div>
                                    <div className="stat-title">Sulfur Dioxide</div>
                                    <div className="stat-value text-primary">{airQualityData["so2"]}</div>
                                </div>

                                <div className="stat">
                                    <div className="stat-title">PM2.5</div>
                                    <div className="stat-value">{airQualityData["pm2_5"]}</div>
                                    <div className="stat-desc text-accent">Partículas finas com diâmetro menor ou igual a 2.5 micrômetros </div>
                                </div>

                                <div className="stat">
                                    <div className="stat-title">PM10</div>
                                    <div className="stat-value">{airQualityData["pm10"]}</div>
                                    <div className="stat-desc text-accent">Partículas finas com diâmetro menor ou igual a 10 micrômetros </div>
                                </div>

                            </div>
                        </div>
                    </>
                )
            }
        </div>
        </>
    )
}

export function getServerSideProps() {
    return {
        props: {
            backend: process.env.APP_BACKEND_URL ? process.env.APP_BACKEND_URL : "http://localhost:8080"
        },
    };
}