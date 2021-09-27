-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 21-09-2021 a las 15:19:47
-- Versión del servidor: 8.0.26-0ubuntu0.20.04.2
-- Versión de PHP: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `gym`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clases`
--

CREATE TABLE `clases` (
  `_id` int NOT NULL,
  `id_entrenador` int NOT NULL,
  `title` varchar(50) NOT NULL,
  `descripcion` varchar(1500) NOT NULL,
  `cupos` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `clases`
--

INSERT INTO `clases` (`_id`, `id_entrenador`, `title`, `descripcion`, `cupos`) VALUES
(3, 12, 'sprint fit', 'correras mucho para volverte fit', 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clase_ins`
--

CREATE TABLE `clase_ins` (
  `_id` int NOT NULL,
  `id_user` int NOT NULL,
  `id_clase` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `clase_ins`
--

INSERT INTO `clase_ins` (`_id`, `id_user`, `id_clase`) VALUES
(5, 14, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `medico`
--

CREATE TABLE `medico` (
  `_id` int NOT NULL,
  `id_user` int NOT NULL,
  `limitacion` varchar(200) NOT NULL,
  `medicamento` varchar(100) NOT NULL,
  `contacto` varchar(15) NOT NULL,
  `eps` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `medico`
--

INSERT INTO `medico` (`_id`, `id_user`, `limitacion`, `medicamento`, `contacto`, `eps`) VALUES
(5, 11, 'ninguna', 'ninguno', '+57234232323', 'compensar'),
(6, 12, 'ninguna', 'ninguno', '+57234232323', 'compensar'),
(7, 13, 'ninguna', 'ninguno', '+57234232323', 'compensar'),
(8, 14, 'ninguna', 'ninguno', '+57234232323', 'compensar'),
(9, 15, 'ninguna', 'ninguno', '+57234232323', 'compensar');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `_id` int NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`_id`, `name`, `email`, `phone`, `password`, `role`) VALUES
(11, 'admin_niko', 'covep85626@secbuf.com', '+5723423232', '$2b$10$6UhD8TUWUOG3xSu3prYUBOCCJLanTiHnzgJ1fBcIXUYHhwUk7twru', 'ADMIN-ROLE'),
(12, 'entrenador', 'entre@gmail.com', '+5723423232', '$2b$10$eQhV7FmTrPAALGxH71kLLeVGFvp3NblxmFXB4jovb83aScsRjwinK', 'ENTRE-ROLE'),
(13, 'user normal', 'user@gmail.com', '+5723423232', '$2b$10$QLQz8FSAGBGSbmUBdj5fiej38PBpjAGo.7t86M0w/Pb8QWyfSisZi', 'DEFAULT-ROLE'),
(14, 'user normal 2', 'user2@gmail.com', '+5723423232', '$2b$10$aNb86MmUxcohPWf9LyrkkOIzAvgSXtIubR0f5/wn2Iny9mFoL.nFi', 'DEFAULT-ROLE'),
(15, 'prueba deploy', 'user4@gmail.com', '+5723423232', '$2b$10$Y.ifz07DGjoyWUFzTq14KOf4s1yQlHskKuzKSJE73aR6IcjoapCja', 'DEFAULT-ROLE');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `clases`
--
ALTER TABLE `clases`
  ADD PRIMARY KEY (`_id`),
  ADD KEY `id_entrenador` (`id_entrenador`) USING BTREE;

--
-- Indices de la tabla `clase_ins`
--
ALTER TABLE `clase_ins`
  ADD PRIMARY KEY (`_id`),
  ADD UNIQUE KEY `id_user` (`id_user`,`id_clase`),
  ADD KEY `id_clase` (`id_clase`);

--
-- Indices de la tabla `medico`
--
ALTER TABLE `medico`
  ADD PRIMARY KEY (`_id`),
  ADD UNIQUE KEY `id_user` (`id_user`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `clases`
--
ALTER TABLE `clases`
  MODIFY `_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `clase_ins`
--
ALTER TABLE `clase_ins`
  MODIFY `_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `medico`
--
ALTER TABLE `medico`
  MODIFY `_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `clases`
--
ALTER TABLE `clases`
  ADD CONSTRAINT `clases_ibfk_1` FOREIGN KEY (`id_entrenador`) REFERENCES `users` (`_id`);

--
-- Filtros para la tabla `clase_ins`
--
ALTER TABLE `clase_ins`
  ADD CONSTRAINT `clase_ins_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`_id`),
  ADD CONSTRAINT `clase_ins_ibfk_2` FOREIGN KEY (`id_clase`) REFERENCES `clases` (`_id`);

--
-- Filtros para la tabla `medico`
--
ALTER TABLE `medico`
  ADD CONSTRAINT `medico_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
