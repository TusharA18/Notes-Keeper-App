export const formatDate = (data) => {
   const d = new Date(data);

   const date = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
   const month = d.getMonth() < 10 ? "0" + d.getMonth() : d.getMonth();
   const year = d.getFullYear();

   const hours = d.getHours() >= 12 ? d.getHours() - 12 : d.getHours();
   const minutes = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
   const standard = d.getHours() >= 12 ? "p.m" : "a.m";

   return `${date}-${month}-${year}, ${hours}:${minutes} ${standard}`;
};
