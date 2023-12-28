import dayjs from "dayjs";

export default function transDate(date: Date | string) {
  return dayjs(date).format("YYYY. MM. DD");
}
