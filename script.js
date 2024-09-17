//  JavaScript for Carousel

const slides = document.querySelectorAll('.carousel-item');
let currentSlide = 0;

document.getElementById('next').addEventListener('click', () => {
    changeSlide(1);
});

document.getElementById('prev').addEventListener('click', () => {
    changeSlide(-1);
});

function changeSlide(direction) {
    slides[currentSlide].classList.add('hidden');
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    slides[currentSlide].classList.remove('hidden');
    slides[currentSlide].classList.add('active');
}


async function fetchData(value) {
    const dataContainer = document.getElementById('dataContainer');

    console.log(value);
    try {
        const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=Potato`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data);

        data.meals.map(item => {
            const newDiv = document.createElement('div');
            newDiv.innerHTML = `
                    <div class="card bg-base-100 h-[450px] shadow-xl">
                        <figure>
                            <img class="w-[250px] h-[250px] rounded-lg"
                                src="${item.strMealThumb}" 
                                alt="${item.strMeal}" />
                        </figure>
                        <div class="card-body">
                            <h2 class="card-title">
                                ${item.strMeal} 
                            </h2>
                            <p>${item.strInstructions.substring(0, 30)}...</p>
                        </div>
                    </div>`;
            dataContainer.appendChild(newDiv);
        })

    } catch (error) {
        console.error("Error fetching data:", error);
        dataContainer.innerHTML = '<p>Error loading data. Please try again later.</p>';
    }
}



document.querySelectorAll('.fetch-menu').forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');
        fetchData(value);
    });
});
