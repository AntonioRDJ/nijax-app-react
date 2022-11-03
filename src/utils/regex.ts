/* eslint-disable no-useless-escape */

export const regexEmail = /^\w+([+.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

export const regexPassword = /^().{8,}$/;

export const regexCNPJ = /^\d{2}[\.]?\d{3}[\.]?\d{3}[\/]?\d{4}[-]?\d{2}$/; // 14 length

export const regexCPF = /^\d{3}[\.]?\d{3}[\.]?\d{3}[-]?\d{2}$/; // 11 length

export const regexCNPJorCPJ = /(^\d{2}[\.]?\d{3}[\.]?\d{3}[\/]?\d{4}[-]?\d{2}$)|(^\d{3}[\.]?\d{3}[\.]?\d{3}[-]?\d{2}$)/

export const regexCellphone = /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/;
