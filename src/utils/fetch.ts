const fetcher = async (input: RequestInfo, init?: RequestInit): Promise<any> => {
  const response = await fetch(input, init);
  const data = await response.json();

  if (response.ok) {
    return data;
  }

  throw new Error(response.statusText);
};

export default fetcher;
