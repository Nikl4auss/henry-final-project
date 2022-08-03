import apiInstance from './apiAxios'

export async function getUsers() {
  try {
    const { data } = await apiInstance.get('/users')
    return data
  }
  catch (err) {
    console.log(err)
    return err
  }
}
