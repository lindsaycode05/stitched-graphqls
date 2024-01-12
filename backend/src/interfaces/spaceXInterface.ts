interface Launch {
  mission_name: string;
  mission_id: [string];
  details: string;
}

interface SpaceXApiResponse {
  data: {
    launchesPast: Launch[];
  };
}

export { Launch, SpaceXApiResponse };
