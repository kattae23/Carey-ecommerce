

export const filtered = ({ searchPro, currentPage, filterItem, filterText, user }) => {

    const filteredPro = filterItem.filter(cat => cat.user._id === user.uid);

    if (searchPro.length === 0) {
        return filteredPro.slice(currentPage, currentPage + 5);
    }

    searchPro = filterText.toLocaleLowerCase().trim();


    // Si hay algo en la caja de texto
    const filtered = filteredPro.filter(cat => cat.name.toLocaleLowerCase().includes(filterText));

    return filtered.slice(currentPage, currentPage + 5)


}
