from setuptools import setup, find_packages

with open("requirements.txt") as f:
	install_requires = f.read().strip().split("\n")

# get version from __version__ variable in custom_timesheet/__init__.py
from custom_timesheet import __version__ as version

setup(
	name="custom_timesheet",
	version=version,
	description="A custom timesheet doctype in it with requirements",
	author="Usama",
	author_email="usamanaveed9263@gmail.com",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
