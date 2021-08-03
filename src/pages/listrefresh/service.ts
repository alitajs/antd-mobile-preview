export const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time));

export async function query(count = 3): Promise<any> {
  const data = [];

  for (let i = 0; i < count; ) {
    data.push({
      // http://stackoverflow.com/a/8084248/1015046
      random: (Math.random() + 1).toString(36).substring(7),
      time: new Date().toString().substring(15, 24),
      id: `${new Date().getTime()}${i}`,
      title: (Math.random() + 1).toString(36).substring(7),
    });
    i += 1;
  }
  await sleep(1000);
  return data;
}
