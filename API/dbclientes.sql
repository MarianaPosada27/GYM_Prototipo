-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 24-03-2025 a las 00:38:42
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `dbclientes`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `id` int(11) NOT NULL,
  `Nombres` varchar(50) NOT NULL,
  `Apellidos` varchar(50) NOT NULL,
  `Nidentificacion` varchar(20) NOT NULL,
  `CorreoElectronico` varchar(20) NOT NULL,
  `TelefonoCelular` varchar(20) NOT NULL,
  `TipoPlan` varchar(10) NOT NULL,
  `ValorPlan` float NOT NULL,
  `FechaInicio` date NOT NULL,
  `Contraseña` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`id`, `Nombres`, `Apellidos`, `Nidentificacion`, `CorreoElectronico`, `TelefonoCelular`, `TipoPlan`, `ValorPlan`, `FechaInicio`, `Contraseña`) VALUES
(1, 'SEBASTIAN', 'RIVERA MIRA', '1152698128', 'SBASTIANPP@GMAIL.COM', '3022153256', 'B', 55000, '2025-03-09', 'SEBAS123'),
(3, 'JOSE', 'CARDONA', '1245', 'JOSE@GMAIL.COM', '30546465', 'B', 55000, '2025-03-20', '123');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `Nombres` varchar(50) NOT NULL,
  `Apellidos` varchar(50) NOT NULL,
  `Nidentificacion` varchar(20) NOT NULL,
  `CorreoElectronico` varchar(20) NOT NULL,
  `TelefonoCelular` varchar(20) NOT NULL,
  `TipoPlan` varchar(10) NOT NULL,
  `ValorPlan` float NOT NULL,
  `FechaInicio` date NOT NULL,
  `Contraseña` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `Nombres`, `Apellidos`, `Nidentificacion`, `CorreoElectronico`, `TelefonoCelular`, `TipoPlan`, `ValorPlan`, `FechaInicio`, `Contraseña`) VALUES
(1, 'ANDRES', 'ESCOBAR', '123456789', 'ANDRESESCOBAR@ITM.ED', '3022153256', '', 0, '0000-00-00', '123'),
(2, 'JUAN DAVID ', 'ALVAREZ', '789456123', 'JUAN@GMAIL.COM', '3022153256', '', 0, '0000-00-00', 'JUAN123'),
(3, 'MARIANA', 'ALVAREZ POSADA', '1152698127', 'MARIANA@GMAIL.COM', '3022153245', '', 0, '0000-00-00', 'MARIANA123');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
