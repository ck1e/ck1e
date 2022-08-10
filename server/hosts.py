from django_hosts import patterns, host

host_patterns = patterns(
    '',
    host(r'', 'portfolio.urls', name=' '),
    host(r'layout', 'layout.urls', name='layout'),
    host(r'js', 'js.urls', name='js'),
)
