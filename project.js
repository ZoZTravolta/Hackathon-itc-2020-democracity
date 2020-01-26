const editMode = () => {
    $('.edit-mode').toggleClass('hidden')
    $('.show-mode').toggleClass('hidden')
    $('.google-map .menu').toggleClass('hidden')
}

// $('#edit-btn').click(() => {
//     maps.setEditableTrue()
//     editMode()
// })

$('.btn-cancel').click(() => {
    editMode()
})

// $('.btn-save').click(() => {
//     editMode()
// })




const changeMap = (id) => {
    document.getElementById("mapScript").remove();
    let script = document.createElement('script')
    script.setAttribute('id', 'mapScript')
    script.setAttribute('src', id + '.js')
    document.getElementsByTagName("BODY")[0].appendChild(script);
}