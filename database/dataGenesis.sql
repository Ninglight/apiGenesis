-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Client :  127.0.0.1:8889
-- Généré le :  Mar 12 Décembre 2017 à 20:48
-- Version du serveur :  5.6.35
-- Version de PHP :  7.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Base de données :  `dataGenesis`
--

-- --------------------------------------------------------

--
-- Structure de la table `elements`
--

CREATE TABLE `elements` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `html` longtext NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `elements`
--

INSERT INTO `elements` (`id`, `name`, `html`, `createdAt`, `updatedAt`) VALUES
('2', 'Heading1', '<h1>Title</h1>', '2017-12-05 02:20:32', '2017-12-05 02:20:32'),
('2k71sckvjb3ok3yz', 'p', '<p>text</p>', '2017-12-12 14:47:51', '2017-12-12 14:47:51'),
('2k71scn1jb3omjmk', 'Heading4', '<h4>Title</h4>', '2017-12-12 14:48:04', '2017-12-12 14:48:04'),
('3', 'Heading2', '<h2>Title</h2>', '2017-12-12 10:54:44', '2017-12-12 10:54:44'),
('4', 'Heading3', '<h3>Title</h3>', '2017-12-12 10:56:06', '2017-12-12 10:56:06');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `createdAt`) VALUES
(1, 'valentin.bourreau@gmail.com', '123', '2017-12-12 00:00:00'),
(2, 'truc', 'machin', '2017-12-12 20:39:25');

-- --------------------------------------------------------

--
-- Structure de la table `usersInfo`
--

CREATE TABLE `usersInfo` (
  `id` varchar(255) NOT NULL,
  `idUser` varchar(255) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `usersInfo`
--

INSERT INTO `usersInfo` (`id`, `idUser`, `firstName`, `lastName`) VALUES
(1, 1, 'Valentin', 'Bourreau');

--
-- Index pour les tables exportées
--

--
-- Index pour la table `elements`
--
ALTER TABLE `elements`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Index pour la table `usersInfo`
--
ALTER TABLE `usersInfo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idUser` (`idUser`);

--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `usersInfo`
--
ALTER TABLE `usersInfo`
  ADD CONSTRAINT `usersinfo_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `users` (`id`);
