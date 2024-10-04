export function transformUrlToHttps(url: string): string {
  const httpsUrl = url.replace(/^http:\/\//, 'https://');
  return httpsUrl === url ? url : httpsUrl;
}



export function transformTimeString(dateTime: string): string {
  const date = new Date(dateTime);
  let hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  hours = hours % 12;
  if (hours === 0) {
    hours = 12;
  }
  const totalMinutes = hours * 60 + minutes + 35;
  const newHours = Math.floor(totalMinutes / 60);
  const newMinutes = totalMinutes % 60;
  const finalHours = newHours % 12;
  const formattedHours = finalHours === 0 ? 12 : finalHours;
  const formattedMinutes = newMinutes.toString().padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}`;
}

export function limitWords(inputString: string): string {
  const maxLength = 100;
  if (inputString.length > maxLength) {
    return inputString.slice(0, maxLength - 3) + '...';
  }
  return inputString;
}

