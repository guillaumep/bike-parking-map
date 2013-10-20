stationnement_velo_mtl
======================

Où sont les stationnements de vélos à Montréal

Pré-requis
----------
* Python 2.7.x
* mongodb 2.4.x

La preuve de concept qu'on retrouve à `http://velotml.arrak.org` utilise une
 instance gratuite de mongolab `https://mongolab.com`.

Installation
------------

Obtention des sources::

    $ git clone https://github.com/guillaumep/stationnement_velo_mtl.git

Création du virtualenv::

    $ virtualenv ~/velomtl-venv
    $ source ~/velomtl-venv/bin/activate
    $ python stationnement_velo_mtl/setup.py develop

Création de la configuration::

    $ cp stationnement_velo_mtl/config.template stationnement_velo_mtl/local.ini

Il ne vous reste ensuite que d'y mettre les bonnes informations quant à votre
serveur mongodb ainsi que votre `hostname` et votre numéro de port.

Utilisation
-----------

Pour lancer le serveur il s'agit seulement de::

    $ velomtl stationnement_velo_mtl/local.ini
