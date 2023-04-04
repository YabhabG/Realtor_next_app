import axios from "axios";

export const baseUrl='https://bayut.p.rapidapi.com'

export const fetchApi=async (url)=>{
    const {data}=await axios.get((url), {
        headers: {
            'x-rapidapi-host': 'bayut.p.rapidapi.com',
            'x-rapidapi-key': 'e8bde0c06bmshae196f3a892e1b8p14a3a1jsnb9c70d19064a'
          }
    });

    return data;
}