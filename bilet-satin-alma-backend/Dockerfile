FROM php:8.2-apache

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer
COPY . /var/www/html/

RUN chown -R www-data:www-data /var/www/html/data

COPY 000-default.conf /etc/apache2/sites-available/000-default.conf

RUN a2enmod rewrite

EXPOSE 80