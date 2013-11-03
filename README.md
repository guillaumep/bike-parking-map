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

Documentation
-------------

Where can I park my bike?

This is a simple question to answer when you are already familiar with the destination, but can get more tricky when it is the first time you go to a certain place.

To answer this question we have built a website that displays most of the bike parking spots in Montreal. Here is the URL:

http://velomtl.arrak.org

I say "most of the parking spots", because this map is far from being complete. However, if you have an OpenStreetMap account, or are willing to create one, you can contribute to the project by going to http://osm.org/, pressing the "Edit" button, and adding missing parking spaces you may know about.

Here is the direct link to create an account: http://www.osm.org/user/new

The bike map we have build also has an "hidden" feature: it allows you to report places where you think the City of Montreal should provide a public bike parking space. We will collect this data over the next few months then provide the results to the City.

To suggest a bike parking, click on the map at the approximate location where you would like to have the parking, and fill-in the reason you would use the parking space for. Providing the reason will help the city prioritize the requests it receives.

You can view the requests that other users of the website did by clicking on the top-right icon (the three gray "sheets" on top of each other), then selecting "Demandes de stationnement" (the last item). Red dots will appear on the map, indicating the location where requests have been made.

Now a few technical notes. Read on if you are interested in knowing more about this project.

The background comes from a project called OpenCycleMap: http://www.opencyclemap.org/. It highlights the bicycle paths in blue. This map is rendered using OpenStreetMap data, so it can be modified the same way. See http://wiki.openstreetmap.org/wiki/OpenCycleMap for more information.

A note on the icons. The blue icons is data coming from OpenStreetMap itself. This data can be modified by clicking on the icon itself then clicking "Edit this entry in iD" (iD is the OpenStreetMap editor). One especially interesting piece of information that can be edited is the capacity of the parking space. This information is displayed when you click on the icon.

Green icons are data coming from the City’s Open Data portal: http://donnees.ville.montreal.qc.ca/

Note that this website is, for now, best viewed on a desktop or on a laptop. It will work on a phone or a tablet, but it will be slow.

If you have questions about OpenStreetMap in Montreal, please feel free to contact the OpenStreetMap Montreal user group, by accessing their website ( http://www.osmtl.org/ ) or writing to their mailing list: http://listes.openstreetmap-montreal.org/listinfo.cgi/osmtl-openstreetmap-montreal.org . Even though the website is only in French for now, the user group welcomes English speakers.

This project was built in one day (!) at the ÉcoHackMtl, Montreal's first Urban Sustainability hackathon, that was held October 19th, 2013. A public vote is now being held by the organizers of the event, and a price will be given to the best project. Please visit http://ecohackmtl.sparkboard.com/ if you would like to vote for this project, and as many other project as you would like (voting for more than one project is allowed). 

This project is an original idea of Zvi Leve and was implemented by Guillaume Pratte, Mathieu Leduc-Hamel and Françoise Provencher on October 19th, 2013.
