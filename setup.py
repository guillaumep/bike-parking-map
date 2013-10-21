from setuptools import setup, find_packages

setup(
    name='stationnement_velo_mtl',
    include_package_data=True,
    packages=find_packages(exclude=['ez_setup']),
    install_requires=[
        "bottle",
        "requests",
        "pymongo",
        "flup",
    ],
    entry_points="""
    [console_scripts]
    velomtl = stationnement_velo_mtl:main
    """)
