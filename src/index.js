import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

refs = {
  searchBox: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.searchBox.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch() {
  const inputValue = refs.searchBox.value.trim();

  if (inputValue) {
    fetchCountries(inputValue).then(renderByConditions).catch(onFetchError);
  } else {
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';
  }
}

function renderByConditions(countries) {
  if (countries.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
    return [];
  }

  if (countries.length <= 10 && countries.length > 1) {
    renderListOfCountries(countries);
    refs.countryInfo.innerHTML = '';
  }

  if (countries.length === 1) {
    renderCountryInfo(countries);
    refs.countryList.innerHTML = '';
  }
}

function onFetchError(error) {
  console.error('chaught error: ', error);
  Notiflix.Notify.failure('Oops, there is no country with that name');
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}

function renderListOfCountries(countries) {
  const markup = countries
    .map(country => {
      {
        return `<li class="country-list__item">
  <img src="${country.flags.svg}" alt="flag" width="30" />${country.name.official}
</li>`;
      }
    })
    .join('');

  refs.countryList.innerHTML = markup;
}

function renderCountryInfo(countries) {
  const country = countries[0];
  const markup = `<div class="country-info__flag-title-wrapper">
   <img src="${country.flags.svg}" alt="flag" width="50" />
   <h1 class="country-info__title">${country.name.official}</h1>
  </div>
  <p><span class="country-info__point">Capital</span> : ${country.capital}</p>
  <p><span class="country-info__point">Population</span> : ${
    country.population
  }</p>
  <p><span class="country-info__point">Languages:</span> ${Object.values(
    country.languages
  )}</p>`;

  refs.countryInfo.innerHTML = markup;
}
