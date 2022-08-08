import apiInstance from "./apiAxios";

export async function getUsers() {
  try {
    const { data } = await apiInstance.get(`/users`);
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
}

export async function blockUser(userId, blocked, token) {
  const { data } = await apiInstance.patch(`/users/${userId}/blockUser`, { blocked }, {

    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return data
}
