

export const filteredUsers = ({ searchPro, currentPage, filterItem, filterText }) => {


    if (searchPro.length === 0) {
        return filterItem.slice(currentPage, currentPage + 5);
    }

    searchPro = filterText.toLocaleLowerCase().trim();


    // Si hay algo en la caja de texto
    const filtered = filterItem.filter(cat => cat.firstName.toLocaleLowerCase().includes(filterText) || cat.lastName.toLocaleLowerCase().includes(filterText));
    return filtered.slice(currentPage, currentPage + 5)

}
