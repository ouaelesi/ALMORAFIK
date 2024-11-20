// get youtube channeles
export const getBooks_Service = async () => {
  let reponse = await fetch("/api/ressources/books")
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });

  return reponse;
};
