import React, {UseContext, useEffect, useState} from "react"; 
import axios from "axios"; 
import {Servidor} from "../Configuracion/ApiUrls"; 
export const AxiosPublico = axios.create({
    baseURL: Servidor,
    timeout: 10000,
    header: {'Content-Type': 'application/json'}
});
export const AxiosPrivado = axios.create({
    baseURL: Servidor,
    timeout: 10000, 
    headers: {'Content-Type': 'application/json'}
});
export const AxiosImagen = axios.create({
    baseURL: Servidor,
    timeout: 10000,
    headers: {'Content-Type': 'multipart/form-data'}
});