-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 15-05-2019 a las 23:48:42
-- Versión del servidor: 10.1.25-MariaDB
-- Versión de PHP: 5.6.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


--
-- Base de datos: `mascotas_bd`
--
CREATE DATABASE IF NOT EXISTS `mascotas_bd` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `mascotas_bd`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `perros`
--

CREATE TABLE `perros` (
  `id` int(11) NOT NULL,
  `tamanio` varchar(50) NOT NULL,
  `edad` int(11) NOT NULL,
  `precio` double NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `raza` varchar(50) NOT NULL,
  `path_foto` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `perros`
--
ALTER TABLE `perros`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `perros`
--
ALTER TABLE `perros`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;COMMIT;
