let allowed = ['rape', 'assault', 'harassment', 'property-trespass', 'substance', 'other'];

const callbacks = [];

function onChange(event) {
  const category = event.target.id
    .split('-')
    .filter((part, i) => i != 0) // exclude `marker` at index 0
    .join('-');

  const checked = event.target.checked;

  allowed = allowed.filter(element => element != category);

  if(checked) {
    allowed.push(category);
  }

  for(let i = 0; i < callbacks.length; i++) {
    callbacks[i](allowed);
  }
}

document.querySelectorAll('.filters input')
  .forEach(input => input.addEventListener('change', onChange));

module.exports = {
  onFiltersChange: function(callback) {
    callbacks.push(callback);
  }
};