// get youtub channeles
export const getYoutubChannels_Service = async () => {
  let reponse = await fetch("/api/ressources/youtube")
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });

  return reponse;
};
