const categoryMap = {
  'bike theft': 'property-trespass',
  'theft': 'property-trespass',
  'hit and run': 'property-trespass',
  'trespass': 'property-trespass',
  'assault': 'assault',
  'vehicle prowling': 'property-trespass',
  'rape': 'rape',
  'mischief': 'other',
  'burglary': 'property-trespass',
  'liquor': 'substance',
  'marijuana': 'substance',
  'drug': 'substance',
  'controlled substance': 'substance',
  'VUCSA': 'substance'
}

function getCategory(row) {
  const desc = row['Offense Description'];

  for(let key of Object.keys(categoryMap)) {
    if(desc.toLowerCase().includes(key)) {
      return categoryMap[key];
    }
  }

  return 'other';
}

module.exports = {
  getCategory
}