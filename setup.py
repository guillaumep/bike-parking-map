from setuptools import setup, find_packages

setup(
    name='stationnement_velo_mtl',
    include_package_data=True,
    packages=find_packages(exclude=['ez_setup']),
    install_requires=[
        "bottle"
    ])