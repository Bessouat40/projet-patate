class QuasiSingleton(type):
    _instances = {}

    def calculate_id(cls, *args, **kwargs):
        return args[0]

    def __call__(cls, *args, **kwargs):
        id = cls.calculate_id(*args)
        if id not in cls._instances.keys():
            cls._instances[id] = super(QuasiSingleton, cls).__call__(*args, **kwargs)
        return cls._instances[id]