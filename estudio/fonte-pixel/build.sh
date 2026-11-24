cd "$(dirname "$0")"
cat a_head.html > estudio.html; printf '\n<script>\n' >> estudio.html; cat b_data.js f_office.js >> estudio.html; printf '</script>\n' >> estudio.html
sed -e 's#<script>#<script src="stub.js"></script><script>#' -e 's#<link rel="stylesheet" href="https://fonts.googleapis.com[^>]*>##' estudio.html > ../ctest/index.html
