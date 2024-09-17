//  JavaScript for Carousel

const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const carouselItems = document.querySelectorAll('.carousel-item');

let currentIndex = 0;

const showSlide = (index) => {
    carouselItems.forEach((item, i) => {
        if (i === index) {
            item.classList.remove('hidden');
            item.classList.add('active');
        } else {
            item.classList.remove('active');
            item.classList.add('hidden');
        }
    });
};

prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex === 0) ? carouselItems.length - 1 : currentIndex - 1;
    showSlide(currentIndex);
});

nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex === carouselItems.length - 1) ? 0 : currentIndex + 1;
    showSlide(currentIndex);
});

// Auto play carousel every 120 seconds
setInterval(() => {
    currentIndex = (currentIndex === carouselItems.length - 1) ? 0 : currentIndex + 1;
    showSlide(currentIndex);
}, 120000);


// API call function and set data in html card
async function fetchData(value) {
    const dataContainer = document.getElementById('dataContainer');
    dataContainer.innerHTML = '';

    console.log(value);
    try {
        const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data);

        data.meals.map(item => {
            const newDiv = document.createElement('div');
            newDiv.innerHTML = `
                    <div class="p-6">
                        <div class="card bg-base-100 h-auto lg:h-[500px] shadow-xl rounded-lg overflow-hidden">
                            <figure class="relative w-full h-[250px] md:h-[300px] lg:h-[250px]">
                                <img class="w-full h-full object-cover rounded-lg" 
                                    src="${item.strMealThumb}" 
                                    alt="${item.strMeal}" />
                            </figure>
                            <div class="card-body p-4">
                                <h2 class="card-title text-xl md:text-2xl lg:text-2xl font-bold">
                                    ${item.strMeal}
                                </h2>
                                <p class="text-sm md:text-base lg:text-lg mt-2">
                                    ${item.strInstructions.substring(0, 50)}...
                                </p>
                            </div>
                        </div>
                    </div>
                    `;
            dataContainer.appendChild(newDiv);
        })

    } catch (error) {
        console.error("Error fetching data:", error);
        dataContainer.innerHTML = '<p>Please try again later.</p>';
    }
}


// call API fetchData() function
document.querySelectorAll('.fetch-menu').forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');
        fetchData(value);
    });
});

// Automatically call API fetchData() function for default value
const defaultButton = document.querySelector('.fetch-menu[data-default="true"]');
if (defaultButton) {
    const defaultValue = defaultButton.getAttribute('data-value');
    fetchData(defaultValue);
}

