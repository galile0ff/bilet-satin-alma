FROM php:8.2-apache

# Composer ekle
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# PHP dosyalarını kopyala
COPY . /var/www/html/

# Apache mod rewrite aktif et
RUN a2enmod rewrite

EXPOSE 80
