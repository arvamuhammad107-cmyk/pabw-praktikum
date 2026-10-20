
const ALAMAT = "https://api.sampleapis.com/coffee/hot";

export async function ambilData() {
    const respons = await fetch(ALAMAT);

    if (!respons.ok) {
        throw new Error(`HTTP ${respons.status}`);
    }

    const data = await respons.json();

    console.log("Data API:", data);
    console.log("JSON:", JSON.stringify(data));

    return data;
}
