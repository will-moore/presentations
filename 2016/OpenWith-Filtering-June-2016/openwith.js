// openwith.js

OME.setOpenWithEnabledHandler("GenBank Protein", function(selected) {
    // Only enabled for single objects...
    if (selected.length !== 1) return false;
    // ... where name is a number (E.g. Gene ID)
    var name = selected[0].name;
    return !isNaN(name);
});
OME.setOpenWithUrlProvider("GenBank Protein", function(selected, url) {
    // Url includes selected 'name' which is an Gene ID
    var name = selected[0].name;
    // E.g. open http://www.ncbi.nlm.nih.gov/protein/000397
    return url + name;
});