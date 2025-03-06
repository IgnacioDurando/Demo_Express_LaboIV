const axios = require('axios');

const getInteriores = async (req, res) => {
    const clientId = process.env.API_KEY_UNSPLASH;  
    const url = `https://api.unsplash.com/search/photos?query=modern+house+interior&client_id=${clientId}&per_page=10&page=1`;

    try {
        const response = await axios.get(url);

        const fotos = response.data.results; 

        const selectedImages = [];
        while (selectedImages.length < 4) {
            const randomIndex = Math.floor(Math.random() * fotos.length);
            const image = fotos[randomIndex];
            if (!selectedImages.includes(image)) {
                selectedImages.push(image);
            }
        }

        const imagenesCasas = selectedImages.map(image => ({
            'image': image.urls.small, 
            'alt_description': image.alt_description,
        }));

        res.status(200).json({
            'interiores': imagenesCasas, 
        });

    } catch (error) {
        console.error('Error al obtener imágenes de interiores de las casas:', error);
        res.status(400).json({
            err_msg: 'Error inesperado al obtener las imágenes de interiores de las casas',
        });
    }
};

const getAlquileres = async (req, res) => {
    const clientId = process.env.API_KEY_UNSPLASH;
    const urls = [];
    for (let i = 1; i <= 5; i++) {
        urls.push(`https://api.unsplash.com/search/photos?query=modern+house+exterior+-inside&client_id=${clientId}&per_page=10&page=${i}`);
    }

    try {
        const responses = await Promise.all(urls.map(url => axios.get(url)));

        const casas = [];
        responses.forEach(response => {
            const fotos = response.data.results;

            const nombres = [
                "La Anhelada",
                "Siempreviva",
                "Aurora Eterna",
                "Luz de Luna",
                "Brisa Dorada",
                "La Escondida",
                "Alma Libre",
                "El Susurro del Mar",
                "Horizonte Azul",
                "Cielo Abierto"
            ];

            const localidades = [
                "Bariloche, Río Negro",
                "San Rafael, Mendoza",
                "Villa Carlos Paz, Córdoba",
                "Puerto Madryn, Chubut",
                "Gualeguaychú, Entre Ríos",
                "Salta, Salta",
                "San Fernando del Valle de Catamarca, Catamarca",
                "Río Gallegos, Santa Cruz",
                "San Luis, San Luis",
                "Ushuaia, Tierra del Fuego"
            ];

            const precios = [
                "$400 USD / mes",
                "$450 USD / mes",
                "$350 USD / mes",
                "$500 USD / mes",
                "$700 USD / mes",
                "$250 USD / mes",
                "$200 USD / mes",
                "$1000 USD / mes",
                "$550 USD / mes",
                "$340 USD / mes"
            ];

            fotos.forEach((foto, index) => {
                casas.push({ 
                    'image': foto.urls.small, 
                    'name': nombres[Math.floor(Math.random() * nombres.length)], 
                    'city': localidades[Math.floor(Math.random() * localidades.length)], 
                    'price': precios[Math.floor(Math.random() * precios.length)] 
                });
            });
        });


        res.status(200).json({
            'alquileres': casas
        });

    } catch (error) {
        res.status(400).json({
            err_msg: 'Error inesperado al obtener las casas'
        });
    }
};

const getNovedades = (req, res) => {
    const clientId2 = process.env.API_KEY_UNSPLASH;
    axios.get(`https://api.unsplash.com/search/photos?query=modern+house+exterior+-inside&client_id=${clientId2}&per_page=10`)
    .then(({data,status,statusText}) => {
        const fotos = data.results;

        const nombres = [
            "La Anhelada",
            "Siempreviva",
            "Aurora Eterna",
            "Luz de Luna",
            "Brisa Dorada",
            "La Escondida",
            "Alma Libre",
            "El Susurro del Mar",
            "Horizonte Azul",
            "Cielo Abierto"
        ];

        const localidades = [
            "Bariloche, Río Negro",
            "San Rafael, Mendoza",
            "Villa Carlos Paz, Córdoba",
            "Puerto Madryn, Chubut",
            "Gualeguaychú, Entre Ríos",
            "Salta, Salta",
            "San Fernando del Valle de Catamarca, Catamarca",
            "Río Gallegos, Santa Cruz",
            "San Luis, San Luis",
            "Ushuaia, Tierra del Fuego"
        ];

        const precios = [
            "$400 USD / mes",
            "$450 USD / mes",
            "$350 USD / mes",
            "$500 USD / mes",
            "$700 USD / mes",
            "$250 USD / mes",
            "$200 USD / mes",
            "$1000 USD / mes",
            "$550 USD / mes",
            "$340 USD / mes"
        ];

        var casas = [];

        fotos.forEach((foto, index) => {
            casas.push({ 'image': foto.urls.small, 'name': nombres[index], 'city': localidades[index], 'price': precios[index] });
        });

        res.status(200).json({
            'novedades': casas,
            status,
            statusText
        });
    })
    .catch((error) => {
        res.status(400).json({
            err_msg: 'Error inesperado'
        });
    });
}

module.exports = {
    getAlquileres,
    getNovedades,
    getInteriores
}