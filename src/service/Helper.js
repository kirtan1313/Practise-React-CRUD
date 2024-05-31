export const getData = (myKey) => {

    let myData = JSON.parse(localStorage.getItem(myKey));

    if (!myData) {
        return []
    }

    return myData;
}