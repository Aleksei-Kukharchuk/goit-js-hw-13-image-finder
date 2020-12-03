import * as basicLightbox from 'basiclightbox'

export default function onOpenModal({ target: { dataset } }) {
    basicLightbox.create(`
    <img width="" height="" src="${dataset.source}">
`).show()
};