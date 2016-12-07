#!/usr/bin/python
import sys
import logging
logging.basicConfig(stream=sys.stderr)
sys.path.insert(0,"/var/www/neighborhood map project/")

from portfolio import app as application
application.secret_key = 'i;x!%T!z[Jipo8 9auyba^&9&ps%/;Av'
